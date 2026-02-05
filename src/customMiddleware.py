from starlette.middleware.base import BaseHTTPMiddleware
import logging

class CustomHeaderMiddleware(BaseHTTPMiddleware):
    def __init__(self):
        super().__init__()
        logging.basicConfig(level=logging.DEBUG)
        self.logger = logging.getLogger("custom_middleware")
    async def dispatch(self, request, call_next):
        self.logger.debug(f"{request.method} {request.url}")
        self.logger.debug("Params:")
        for name, value in request.path_params.items():
            self.logger.debug(f"\t{name}: {value}")
        self.logger.debug("Headers:")
        for name, value in request.headers.items():
            self.logger.debug(f"\t{name}: {value}")
        response = await call_next(request)
        return response