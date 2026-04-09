from enum import Enum
import json
from typing import Annotated
from pydantic import BaseModel, StringConstraints

PAGES_MANIFEST = "static/dist/pages/pages_manifest.json"

class Paths(Enum):
    ELEM = "elem"
    MED = "med"
    LIC = "lic"
    NATALE = "natale"
    ALIEN = "alien"

class GameManagerOptions(BaseModel):
    percorso: Annotated[str, StringConstraints(pattern=r'^(elem|med|lic|natale|alien)$')] = "lic"

class GameManager:
    def __init__(self, options: GameManagerOptions):
        self.current_page = 0
        self.options = options
        with open(PAGES_MANIFEST, "r") as f:
            self.allpages = json.load(f)

    def change_path(self, new_path: str):
        self.options.percorso = new_path

    def get_current_path(self):
        return self.options.percorso

    def get_current_page(self):
        return self.allpages[self.options.percorso][self.current_page]
