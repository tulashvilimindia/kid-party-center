#!/bin/bash
echo "=========================================="
echo "Running KidParty Seed Script"
echo "=========================================="
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Run the seed script
node seed.js

echo ""
echo "=========================================="
echo "Seed script completed!"
echo "=========================================="
