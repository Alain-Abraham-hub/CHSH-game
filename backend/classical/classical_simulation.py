"""
Simulation of the classical CHSH game.

This module simulates repeated rounds of the CHSH game using
classical deterministic strategies and computes the win rate.
"""

import random
try:
    from .classical_strategy import get_classical_strategy
except ImportError:
    from classical_strategy import get_classical_strategy


def play_round(alice_strategy, bob_strategy) -> bool:
    """
    Play one round of the CHSH game.

    Returns True if the round is won, False otherwise.
    """
    # Referee chooses random inputs
    x = random.randint(0, 1)
    y = random.randint(0, 1)

    # Alice and Bob produce outputs
    a = alice_strategy(x)
    b = bob_strategy(y)

    # CHSH winning condition: a ⊕ b = x · y
    return (a ^ b) == (x & y)


def simulate(strategy_name: str, num_rounds: int = 10_000) -> float:
    """
    Simulate many rounds of the CHSH game for a given classical strategy.

    Returns the win probability.
    """
    # Handle 'best' as an alias for always_zero
    if strategy_name == 'best':
        strategy_name = 'always_zero'
    
    alice_strategy, bob_strategy = get_classical_strategy(strategy_name)

    wins = 0
    for _ in range(num_rounds):
        if play_round(alice_strategy, bob_strategy):
            wins += 1

    return wins / num_rounds


def run_all_strategies(num_rounds: int = 10_000):
    """
    Run simulations for all predefined classical strategies.
    """
    strategies = [
        "always_zero",
        "always_one",
        "copy_input",
        "inverted_input",
    ]

    print("Classical CHSH strategies:")
    print("-" * 35)

    for strategy in strategies:
        win_rate = simulate(strategy, num_rounds)
        print(f"{strategy:15} → {win_rate * 100:.2f}% win rate")


if __name__ == "__main__":
    run_all_strategies()