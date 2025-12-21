"""
Creates a Bell pair for the CHSH game.

Bell state used:
|Φ+⟩ = (|00⟩ + |11⟩) / √2
"""

from qiskit import QuantumCircuit


def create_bell_pair() -> QuantumCircuit:
    """
    Returns a QuantumCircuit with a Bell pair prepared.
    """
    qc = QuantumCircuit(2, 2)

    # Create entanglement
    qc.h(0)        # Hadamard on Alice's qubit
    qc.cx(0, 1)    # CNOT to entangle with Bob

    return qc