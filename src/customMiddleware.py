from starlette.middleware.base import BaseHTTPMiddleware
from loguru import logger

class CustomHeaderMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        logger.debug(f"{request.method} {request.url}")
        logger.debug("Params:")
        for name, value in request.path_params.items():
            logger.debug(f"\t{name}: {value}")
        logger.debug("Headers:")
        for name, value in request.headers.items():
            logger.debug(f"\t{name}: {value}")
        response = await call_next(request)
        return response