defmodule PowerGrid.GameServer do
  use GenServer
  # alias PowerGrid.Storage.Game, as: GameStorage
  # alias PowerGrid.Storage.Player, as: PlayerStorage

  # @moduledoc """
  # GenServer for an active game
  # """

  # ### client ###

  # @doc """
  # Start a game server
  # """

  # def start(%GameStorage{} = game) do
  #   Supervisor.start_child(PowerGrid.GameSupervisor, [game])
  # end

  # @doc false
  # def start_link(game) do
  #   GenServer.start_link(__MODULE__, [game], name: __MODULE__)
  # end

  # @doc """
  # Create a new game
  # """
  # # def create(player_id, player_name, color) do
  # #   game_owner = %Player{
  # #     id: player_id,
  # #     name: player_name,
  # #     color: color,
  # #     join_at: DateTime.utc_now()
  # #   }
  # #   game = %Game{
  # #     status: "waiting",
  # #     players: [game_owner],
  # #     actions: [],
  # #     arbiter_version: "0.0.0",
  # #   }
  # #   PowerGrid.Repo.insert!(game)
  # #   pid = PowerGrid.Game.Supervisor.start_child(game)
  # #   updated_game_list = Map.put game_list, game.id, pid

  # #   {:reply, :ok, updated_game_list}
  # # end

  # ### server ###

  # def init(%Game{} = game) do
  #   {:ok, game}
  # end

  # def handle_call(:get, game) do
  #   {:reply, game, game}
  # end
end
