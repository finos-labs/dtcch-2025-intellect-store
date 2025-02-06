from Model import solve_ntsp
from DataModels import *
from DataInput import generate_ntsp_input, transactions_from_csv, gen_init_conditions

import pandas as pd


if __name__ == "__main__":
    # ntsp_data = generate_ntsp_input(
    #     n_transactions=150,
    #     n_collateral_links=25,
    #     n_accounts=15,
    #     n_securities=15
    # )

    data = pd.read_csv("settlement_optimization/Data/transactions.csv")
    batch = data.tail(200)
    batch = batch.loc[batch["from"] != batch["to"]]

    accs, sec_poss, coll_links =  gen_init_conditions(batch)
    trans, after_links = transactions_from_csv(batch)

    # print(accs)
    # print(sec_poss)
    # print(coll_links)
    # print(trans)
    # print(after_links)

    ntsp_data = NTSPInput(
        transactions=trans,
        accounts=accs,
        collateral_links=coll_links,
        after_links=after_links,
        security_positions=sec_poss
    )

    _, _, _, _, _, metrics = solve_ntsp(ntsp_data, lambda_weight=0.5)

    print(metrics)


