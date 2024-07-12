from dataclasses import dataclass


@dataclass
class UserFittestResult:
    user_id: str
    height: int
    weight: int
    push_up: int
    crunches: int
    forward_bend: enumerate

    def to_json(self) -> dict:
        return {
            'push_up': self.push_up,
            'crunches': self.crunches,
            'forward_bend': self.forward_bend
        }

    def get_points(self, gender: str) -> dict:
        forward_bend_points = 0
        push_up_points = 0
        crunches_points = 0
        match gender:
            case 'M':
                if self.push_up >= 35:
                    push_up_points = 25
                elif self.push_up >= 28:
                    push_up_points = 15
                elif self.push_up >= 15:
                    push_up_points = 10

                if self.crunches >= 48:
                    crunches_points = 25
                elif self.crunches >= 35:
                    crunches_points = 15
                elif self.crunches >= 20:
                    crunches_points = 10
            case 'F':
                if self.push_up >= 20:
                    push_up_points = 25
                elif self.push_up >= 15:
                    push_up_points = 15
                elif self.push_up >= 10:
                    push_up_points = 10

                if self.crunches >= 43:
                    crunches_points = 25
                elif self.crunches >= 35:
                    crunches_points = 15
                elif self.crunches >= 20:
                    crunches_points = 10
            case _:
                raise ValueError("Invalid gender")

        if self.forward_bend == 'palms':
            forward_bend_points = 25
        elif self.forward_bend == 'fists':
            forward_bend_points = 15
        elif self.forward_bend == 'fingers':
            forward_bend_points = 10
        return {
            "push_up": push_up_points,
            "crunches": crunches_points,
            "forward_bend": forward_bend_points
        }
