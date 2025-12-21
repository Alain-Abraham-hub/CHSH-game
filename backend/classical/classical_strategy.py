"""
Classical strategies for the CHSH game.

In the classical setting:
- Alice outputs a = f(x)
- Bob outputs b = g(y)
where f and g are fixed deterministic functions.
"""

from typing import Callable, Tuple


def always_zero(x: int) -> int:
    """
    Strategy: always output 0, regardless of input.
    This achieves the optimal classical win rate of 75%.
    """
    return 0


def always_one(x: int) -> int:
    """
    Strategy: always output 1, regardless of input.
    """
    return 1


def copy_input(x: int) -> int:
    """
    Strategy: output the received input bit.
    """
    return x


def inverted_input(x: int) -> int:
    """
    Strategy: output the flipped input bit.
    """
    return 1 - x


def get_classical_strategy(name: str) -> Tuple[Callable[[int], int], Callable[[int], int]]:
    """
    Returns a pair of strategies (Alice, Bob) by name.
    """

    strategies = {
        "always_zero": (always_zero, always_zero),
        "always_one": (always_one, always_one),
        "copy_input": (copy_input, always_zero),
        "inverted_input": (inverted_input, always_zero),
    }

    if name not in strategies:
        raise ValueError(f"Unknown strategy: {name}")

    return strategies[name]