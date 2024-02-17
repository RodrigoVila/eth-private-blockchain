# ETH Private Netowork

Pproject made to understand how to config and run interoperable eth nodes.

## Pre requisites

- Download geth from [geth website](https://geth.ethereum.org/downloads).
- If necessary, add developer tools when install. This might allow tools like bootnode to work properly

## Setup nodes

### Create accounts

Create a pwd.txt file to store your password and run

```js
geth --datadir <NODE_NAME> account new --password ./pwd.txt
```

Where `<NODE_NAME>` is the name of node you are creating. If you run the same command without changing the node name, a new account will be added to that node.

_Note_: Password file creation can be avoided removing this `--password ./pwd.txt` but the password will be prompted every time its needed.

### Create genesis.json

- Create a genesis.json file. You could get an example from [geth - private network config](https://geth.ethereum.org/docs/fundamentals/private-network). Or you could use the included genesis file within this repo.

- Add your node address to the "extradata" param.
  - That param starts with "0x" and 64 times "0".
  - Then the nodes addresses (40 characters each)
  - Then 130 times "0"
  - Total extradata string length should be 236 with 1 node address, 276 with 2, 316 with 3, etc.

Alloc accounts should be used only if we want to start the blockchain with a desired amount of ethers over those accounts. You could try using the accounts created at the previous step.

### Generate node data

Run for each node

```js
geth init --datadir <NODE_NAME> genesis.json
```

## Get an enode

Run to generate boot.key

```js
bootnode --genkey=boot.key
```

Run to start your bootnode. Enode will be printed in the console

```js
bootnode --nodekey=boot.key
```

## Run nodes

To run your Ethereum nodes with Geth, follow the customizable command below. Ensure to replace placeholder values with your specific settings to avoid conflicts and ensure proper node operation.

### Command structure

```bash
geth --authrpc.port <AUTH_RPC_PORT> --ipcpath "<IPC_PATH>" --datadir <DATA_DIRECTORY> --syncmode full --http --http.api admin,eth,miner,net,personal --http.port <HTTP_PORT> --allow-insecure-unlock --unlock "<ACCOUNT_ADDRESS>" --password pwd.txt --port <PEER_PORT> --bootnodes <YOUR_ENODE>
```

- `<AUTH_RPC_PORT>`: The port for authorized RPC calls. Assign a unique port for each node.
- `<IPC_PATH>`: Path to the IPC socket file, ensuring a unique path if running multiple nodes on the same machine.
- `<DATA_DIRECTORY>`: Directory for storing node data. Use a separate directory for each node.
- `<HTTP_PORT>`: Port for the HTTP JSON RPC server. Must be unique for each node.
- `<ACCOUNT_ADDRESS>`: Ethereum address to unlock for transactions. Corresponds to the account created for each node in the "Create accounts" step.
- `<PEER_PORT>`: Network listening port. Differentiate this port for each node on the same network.
- `<YOUR_ENODE>`: enode you got from the previous step. Should be the same for every node.

### Follow up example

Open [createNode.js file](./createNode.js) to see example commands

## Access nodes

Run to open a console that interacts with the desired node

```bash
geth attach http://localhost:<NODE_PORT>
```

<NODE_PORT> would be 9546 or 9546 from the previous examples.

You can get a list of namespaces commands and how to use them here: [JSON-RPC Namespaces Docs](https://geth.ethereum.org/docs/interacting-with-geth/rpc)

---

For more info, read [Geth Private Network Documentation](https://geth.ethereum.org/docs/fundamentals/private-network). This part of the docs was a summary of that.
