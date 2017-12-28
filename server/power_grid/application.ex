defmodule PowerGrid.Application do
  use Application

  @moduledoc """
  The Application

  - Repo (Persistence)
  - Endpoint (Web)
  - PubSub (Game - Channel)
  - Game Supervisor (supervise game servers)
  - Lobby (online number and game list)
  """

  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      supervisor(PowerGrid.Repo, []),
      supervisor(PowerGridWeb.Endpoint, []),
      # supervisor(Phoenix.PubSub.PG2, [:power_grid, []]),
      game_supervisor(),
      worker(PowerGrid.Lobby, []),
      worker(Task, [&load_games/0], restart: :temporary),
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PowerGrid.Supervisor]
    Supervisor.start_link(children, opts)
  end

  defp game_supervisor() do
    import Supervisor.Spec

    children = [
      worker(PowerGrid.GameServer, [], restart: :transient),
    ]
    opts = [strategy: :simple_one_for_one, name: PowerGrid.GameSupervisor]
    supervisor(Supervisor, [children, opts])
  end

  defp load_games() do
    initial_games = PowerGrid.Repo.all(PowerGrid.Storage.Game)
    Enum.each initial_games, fn (game) ->
      PowerGrid.GameServer.start(game)
    end
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    PowerGridWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
