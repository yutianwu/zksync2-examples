package main

import (
	"context"
	"fmt"
	"github.com/zksync-sdk/zksync2-go/clients"
	"log"
)

func main() {
	var (
		ZkSyncEraProvider = "https://testnet.era.zksync.dev"
	)

	client, err := clients.Dial(ZkSyncEraProvider)
	if err != nil {
		log.Panic(err)
	}
	defer client.Close()

	// get first 255 tokens
	tokens, err := client.ConfirmedTokens(context.Background(), 0, 255)
	if err != nil {
		log.Panic(err)
	}

	for _, token := range tokens {
		fmt.Printf("%+v\n", *token)
	}
}
