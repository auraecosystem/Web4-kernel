# Web4 OS Cluster

```
echo "# Web4-kernel" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/auraecosystem/Web4-kernel.git
git push -u origin main

```
A self-healing distributed operating system prototype.

## Features
- Autonomous node recovery
- Distributed VM runtime
- CRDT state sync
- Mesh networking
- JSON5 control plane

## Run

```bash
npm install
node cluster/supervisor.js
