from dataclasses import dataclass


@dataclass
class UserFittestResult:
    user_id: str
    height: int
    weight: int
    push_up: int
    crunches: int
    forward_bend: int

    def to_json(self):
        return {
            'push_up': self.push_up,
            'crunches': self.crunches,
            'forward_bend': self.forward_bend
        }
