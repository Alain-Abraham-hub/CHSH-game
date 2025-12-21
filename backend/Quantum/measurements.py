"""
Measurement logic for the CHSH game.

Measuring in a chosen basis is implemented by:
1. Applying a rotation gate
2. Measuring in the computational (Z) basis
"""

from qiskit import QuantumCircuit
import math


# Optimal CHSH measurement angles (in radians)
ALICE_ANGLES = {
    0: 0,                 # x = 0 → 0°
    1: math.pi / 2        # x = 1 → 90°
}

BOB_ANGLES = {
    0: math.pi / 4,       # y = 0 → +45°
    1: -math.pi / 4       # y = 1 → −45°
}


def apply_measurements(qc: QuantumCircuit, x: int, y: int):
    """
    Apply CHSH measurements based on referee inputs x and y.

    Args:
        qc: QuantumCircuit containing the Bell pair
        x: Alice's input bit (0 or 1)
        y: Bob's input bit (0 or 1)
    """

    # Alice chooses measurement based on x
    theta_a = ALICE_ANGLES[x]
    qc.ry(-theta_a, 0)

    # Bob chooses measurement based on y
    theta_b = BOB_ANGLES[y]
    qc.ry(-theta_b, 1)

    # Measure both qubits
    qc.measure(0, 0)  # Alice → classical bit a
    qc.measure(1, 1)  # Bob → classical bit b