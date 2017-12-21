defmodule PowerGrid.Application do
  use Application

  @moduledoc """
  The Application

  - Repo (Persistence)
  - Endpoint (Web)
  - Redis.Supervisor (PubSub with game logic)
  """

  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      supervisor(PowerGrid.Repo, []),
      supervisor(PowerGridWeb.Endpoint, []),
      supervisor(PowerGrid.Redis.Supervisor, []),
      supervisor(PowerGrid.Game.Supervisor, []),
      worker(PowerGrid.OnlineNum, []),
      worker(PowerGrid.Game.Registry, []),
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: PowerGrid.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    PowerGridWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
