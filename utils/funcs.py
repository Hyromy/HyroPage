from copy import deepcopy

from requests import get as fetch

from .vars import RENDER_CTX

def render_ctx(*,
    title:str = None,
    styles:list[str] = None,
    scripts:list[str] = None
) -> dict:
    """
    Create a render context based on `RENDER_CTX` with optional modifications.
    
    Args:
        title (str, optional): Page title modification.
            - If starts with space: appends to default title
            - If ends with space: prepends to default title  
            - Otherwise: replaces default title
        
        styles (list[str], optional): CSS styles modification.
            - If first element is None: appends remaining items to default styles
            - Otherwise: replaces default styles completely
        
        scripts (list[str], optional): JavaScript scripts modification.
            - Same logic as styles
    
    Returns:
        dict: New context dictionary with modifications applied.
        
    Examples:
        >>> render_ctx(title="Home")
        {'head': {'title': 'Home', ...}}
        
        >>> render_ctx(title=" | MySite")  
        {'head': {'title': 'Default Title | MySite', ...}}
        
        >>> render_ctx(styles=[None, "custom.css"])
        # Appends "custom.css" to existing styles
        
        >>> render_ctx(styles=["new.css", "theme.css"])
        # Replaces all styles with these two
    
    Raises:
        AssertionError: If arguments don't match expected types.
    """

    assert isinstance(title, (str, type(None)))
    assert isinstance(styles, (list, type(None)))
    assert isinstance(scripts, (list, type(None)))
    
    ctx = deepcopy(RENDER_CTX)
    
    if title:
        if title.startswith(" "):
            ctx["head"]["title"] += title
        elif title.endswith(" "):
            ctx["head"]["title"] = title + ctx["head"]["title"]
        else:
            ctx["head"]["title"] = title
                
    __locals = locals()
    for key in ("styles", "scripts"):
        if __locals[key] and __locals[key][0] == None:
            for item in __locals[key][1:]:
                if item not in ctx["head"][key]:
                    ctx["head"][key].append(item)
        
        elif __locals[key]:
            ctx["head"][key] = __locals[key]

    return ctx
