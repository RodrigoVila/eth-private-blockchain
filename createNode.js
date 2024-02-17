// 1. Create Accounts
"geth --datadir node1 account new --password ./pwd.txt"
"geth --datadir node2 account new --password ./pwd.txt"
"geth --datadir node3 account new --password ./pwd.txt"


// 2. A. Init nodes data,
// B. Copy nodes addresses
// C. Replace on --unlock address for each node at step 4
// D. Replace addresses at metadata one next to the other one
"geth init --datadir node1 genesis.json"
"geth init --datadir node2 genesis.json"
"geth init --datadir node3 genesis.json"

// 3. Run bootnode and get enode for next step
"bootnode --genkey=boot.key"
"bootnode --nodekey=boot.key"

    // 4.Start nodes (Node 2 can recieve queries using graphql: http://localhost:9546/graphql/ui)
    `geth --authrpc.port 9553 --ipcpath "\\.\pipe\node1" --datadir node1 --syncmode full --http --http.api admin,eth,miner,net,personal --http.port 9545 --allow-insecure-unlock --unlock "0xc95a12dec7d3a0f79d3a3268912afd13fe101967" --password pwd.txt --port 30035 --bootnodes enode://a4dc4a1b40c8c699ed5099eee28529268d9d421e2e30abb494082c4f6cec67c98da0422bb02e899a80d75018064ffd9aa5e1eda7219cc187f4d0582385bd0aa0@127.0.0.1:0?discport=30301`
    `geth --authrpc.port 9554 --ipcpath "\\.\pipe\node2" --datadir node2 --syncmode full --http --http.api admin,eth,miner,net,personal --http.port 9546 --allow-insecure-unlock --unlock "0x771490ff0d934897fb430ed4212f83cb5d74946c" --password pwd.txt --port 30036 --bootnodes enode://a4dc4a1b40c8c699ed5099eee28529268d9d421e2e30abb494082c4f6cec67c98da0422bb02e899a80d75018064ffd9aa5e1eda7219cc187f4d0582385bd0aa0@127.0.0.1:0?discport=30301 --graphql`
    `geth --authrpc.port 9555 --ipcpath "\\.\pipe\node3" --datadir node3 --syncmode full --http --http.api admin,eth,miner,net,personal --http.port 9547 --allow-insecure-unlock --unlock "0x34c702381d7064f79f334fcb5f387a6e77203542" --password pwd.txt --port 30037 --bootnodes enode://a4dc4a1b40c8c699ed5099eee28529268d9d421e2e30abb494082c4f6cec67c98da0422bb02e899a80d75018064ffd9aa5e1eda7219cc187f4d0582385bd0aa0@127.0.0.1:0?discport=30301`