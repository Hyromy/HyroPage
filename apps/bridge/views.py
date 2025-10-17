from django.core.cache import cache
from django.http import JsonResponse

import asyncio
import httpx

from os import getenv

async def get_repos(request):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status = 405)
    
    cached = cache.get("github_repos")
    if cached:
        print("Serving GitHub repos from cache")
        return JsonResponse(cached, safe = False)

    headers = {"Authorization": f"Bearer {getenv('GITHUB_TOKEN')}"}

    async with httpx.AsyncClient(
        timeout = 10.0,
        limits = httpx.Limits(
            max_connections = 10,
            max_keepalive_connections = 5
        )
    ) as client:
        response = await client.get(
            "https://api.github.com/user/repos",
            headers = headers,
            params = {
                "affiliation": "owner,collaborator,organization_member",
                "per_page": 100,
                "sort": "updated",
            }
        )
        response.raise_for_status()
        raw_data = response.json()
        blacklist = set()
        data = [i for i in raw_data if 
            (i["owner"]["login"] == "Hyromy" and not i["private"])
            or (i["owner"]["login"] != "Hyromy" and i["name"] not in blacklist)
        ]

        async def fetch_langs(url):
            try:
                r = await client.get(url, headers=headers)
                r.raise_for_status()
                return r.json()
            except:
                return {}

        langs_results = await asyncio.gather(
            *(fetch_langs(repo["languages_url"]) for repo in data),
            return_exceptions=True
        )

        for i, langs in enumerate(langs_results):
            data[i]["langs"] = langs if not isinstance(langs, Exception) else {}

    cache.set("github_repos", data, timeout = 86400)
    return JsonResponse(data, safe = False)
