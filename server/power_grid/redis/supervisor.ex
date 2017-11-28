defmodule PowerGrid.Redis.Supervisor do
  use Supervisor

  @moduledoc """
  Supervisor of redis clients.
  """

  # api

  @doc false
  def start_link() do
    Supervisor.start_link(__MODULE__, [], name: __MODULE__)
  end

  # callbacks

  @doc false
  def init(_) do
    pool_size = PowerGrid.Redis.PubSub.pool_size
    redix_client_workers = for i <- 0..(pool_size - 1) do
      worker(Redix, [[], [name: :"redix_client_#{i}"]], id: {Redix, i})
    end

    redix_pubsub_workers = for i <- 0..(pool_size - 1) do
      worker(Redix.PubSub, [[], [name: :"redix_pubsub_#{i}"]], id: {Redix.PubSub, i})
    end

    power_grid_pubsub = [worker(PowerGrid.Redis.PubSub, [])]

    children = redix_client_workers ++ redix_pubsub_workers ++ power_grid_pubsub
    opts = [strategy: :one_for_one, name: PowerGrid.Redis.Supervisor]
    {:ok, result} = Supervisor.init(children, opts)

    {:ok, result}
  end
end
