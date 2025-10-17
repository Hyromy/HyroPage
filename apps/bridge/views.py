from django.core.cache import cache
from django.http import JsonResponse

from asyncio import gather
from httpx import AsyncClient, Limits

from os import getenv

from utils.vars import REPOS_BLACKLIST

async def get_repos(request, username):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status = 405)
    
    cached = cache.get("github_repos")
    if cached:
        return JsonResponse(cached, safe = False)

    token = getenv("GH_TOKEN", None)
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    params = {"per_page": 100, "sort": "updated"}
    if token:
        params["affiliation"] = "owner,collaborator,organization_member"
    url = "https://api.github.com/user/repos" if token else f"https://api.github.com/users/{username}/repos"

    async with AsyncClient(
        timeout = 10.0,
        limits = Limits(
            max_connections = 10,
            max_keepalive_connections = 5
        )
    ) as client:
        try:
            response = await client.get(url, headers = headers, params = params)
            response.raise_for_status()
        except:
            return JsonResponse({"error": response.text}, status = response.status_code)

        raw_data = response.json()
        data = [i for i in raw_data if 
            (
                (i["owner"]["login"] == username and not i["private"])
                or (i["owner"]["login"] != username and i["name"])
            ) and i["name"] not in REPOS_BLACKLIST
        ]

        async def fetch_langs(url):
            try:
                r = await client.get(url, headers = headers)
                r.raise_for_status()
                return r.json()
            except:
                return {}

        langs_results = await gather(
            *(fetch_langs(repo["languages_url"]) for repo in data),
            return_exceptions=True
        )

        for i, langs in enumerate(langs_results):
            data[i]["langs"] = langs if not isinstance(langs, Exception) else {}

    cache.set("github_repos", data, timeout = 86400)
    return JsonResponse(data, safe = False)
