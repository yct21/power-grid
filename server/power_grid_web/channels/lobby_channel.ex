defmodule PowerGridWeb.LobbyChannel do
  use PowerGridWeb, :channel
  import ShorterMaps
  alias PowerGrid.Lobby

  @moduledoc """
  Channel for users in lobby.

  - refresh online number
  - refresh game list
  """

  def join("lobby", _params, socket) do
    Lobby.enter_lobby(self())

    {:ok, socket}
  end

  def handle_in("game:create", %{"userName" => player_name, "color" => color}, socket) do
    Lobby.create_game({socket.assigns[:user_id], player_name, color})

    {:reply, :ok, socket}
  end

  @doc """
  Send initialize data to user
  """
  def handle_info({:after_join, ~M{online_num, games}}, socket) do
    push socket, "initialize", %{
      "onlineNum" => online_num,
      "gameList" => games,
    }

    {:noreply, socket}
  end

  @doc """
  When user socket lost connect for whatever reason
  """
  def terminate(_message, _socket) do
    Lobby.leave_lobby()
  end
end
