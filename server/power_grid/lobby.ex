defmodule PowerGrid.Lobby do
  @moduledoc """
  Lobby server APIs.
  """
  alias PowerGrid.Lobby.Server, as: LobbyServer

  @doc """
  Starts Lobby GenServer
  """
  def start_link do
    GenServer.start_link(LobbyServer, [], name: LobbyServer)
  end

  @doc """
  User enters lobby
  """
  def enter(channel_pid) do
    GenServer.cast(LobbyServer, {:enter, channel_pid})
  end

  @doc """
  User leaves lobby
  """
  def leave do
    GenServer.cast(LobbyServer, :leave)
  end

  @doc """
  User creates a game
  """
  def create_game(player_id, player_name, player_color) do
    GenServer.call(LobbyServer, {:create_game, player_id, player_name, player_color})
  end
end
