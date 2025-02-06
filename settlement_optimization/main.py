from Model import solve_ntsp
from DataModels import *
from DataInput import generate_ntsp_input, ntsp_input_from_batch
from DataVisual import plot_before_after, plot_single_run
import pandas as pd


if __name__ == "__main__":
    # ntsp_data = generate_ntsp_input(
    #     n_transactions=150,
    #     n_collateral_links=25,
    #     n_accounts=15,
    #     n_securities=15
    # )

    # batch = pd.read_csv("settlement_optimization/Data/transactions.csv").tail(200)
 
    # problem = ntsp_input_from_batch(batch)

    # _, _, _, _, _, metrics = solve_ntsp(problem, lambda_weight=0.25)

    # print(metrics)

    data = pd.read_csv("settlement_optimization/Data/transactions.csv").tail(12000)
    batch_metrics = []
    for i in range(2, 32, 1):
        batch = data.iloc[-300*i:-300*(i-1)]

        problem = ntsp_input_from_batch(batch)

        _, _, _, _, _, metrics = solve_ntsp(problem, lambda_weight=0.25)

        batch_metrics.append(metrics)

    plot_before_after(batch_metrics[:15], batch_metrics[15:])



