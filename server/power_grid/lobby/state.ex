defmodule PowerGrid.Lobby.State do
  @moduledoc """
  State of GenServer PowerGrid.Lobby.Server
  """

  alias PowerGrid.Lobby.OnlineNum
  alias PowerGrid.Lobby.GameMap
  alias PowerGrid.Schema.Game, as: SchemaGame
  alias __MODULE__, as: LobbyState

  defstruct [:online_num, :games]

  def new do
    %LobbyState{
      online_num: OnlineNum.new(),
      games: GameMap.new(),
    }
  end

  def enter_lobby(%LobbyState{online_num: online_num} = state) do
    %LobbyState{state | online_num: OnlineNum.increase(online_num)}
  end

  def leave_lobby(%LobbyState{online_num: online_num} = state) do
    %LobbyState{state | online_num: OnlineNum.decrease(online_num)}
  end

  def create_game(%SchemaGame{} = schema_game, %LobbyState{games: games} = state) do
    %LobbyState{state | games: GameMap.insert_game(schema_game, games)}
  end
end
