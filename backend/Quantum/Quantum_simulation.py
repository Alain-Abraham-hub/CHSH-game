"""
Quantum simulation of the CHSH game.

This module:
- Creates a Bell pair
- Applies measurement rotations based on inputs (x, y)
- Measures outcomes
- Computes the CHSH win probability
"""

import random
from qiskit_aer import AerSimulator
try:
    from .bell_pair import create_bell_pair
    from .measurements import apply_measurements
except ImportError:
    from bell_pair import create_bell_pair
    from measurements import apply_measurements


def play_round(backend) -> bool:
    """
    Play one round of the quantum CHSH game.
    Returns True if the round is won, False otherwise.
    """

    # Referee randomly chooses inputs
    x = random.randint(0, 1)
    y = random.randint(0, 1)

    # Create Bell pair
    qc = create_bell_pair()

    # Apply measurements based on x and y
    apply_measurements(qc, x, y)

    # Execute circuit (1 shot = 1 game round)
    result = backend.run(qc, shots=1).result()
    counts = result.get_counts()

    # Extract measurement result
    bitstring = list(counts.keys())[0]

    # Qiskit uses little-endian order: c1 c0
    b = int(bitstring[0])  # Bob
    a = int(bitstring[1])  # Alice

    # CHSH winning condition: a ⊕ b = x · y
    return (a ^ b) == (x & y)


def simulate(num_rounds: int = 10_000) -> float:
    """
    Simulate many rounds of the quantum CHSH game.
    Returns the win probability.
    """

    backend = AerSimulator()
    wins = 0

    for _ in range(num_rounds):
        if play_round(backend):
            wins += 1

    return wins / num_rounds


if __name__ == "__main__":
    win_rate = simulate()
    print(f"Quantum CHSH win rate: {win_rate * 100:.2f}%")