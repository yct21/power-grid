defmodule PowerGridWeb.LobbyChannel do
  import ShorterMaps
  use PowerGridWeb, :channel
  alias Phoenix.PubSub
  alias PowerGrid.Storage.Game
  alias PowerGrid.Storage.Player
  alias PowerGrid.Lobby

  @moduledoc """
  Channel for users in main menu.

  - refresh online number
  - refresh game list
  """

  def join("lobby", _params, socket) do
    Lobby.user_join(self())

    {:ok, socket}
  end

  def handle_in("game:create", %{"userName" => player_name, "color" => color}, socket) do
    GameRegistry.create_game({socket.assigns[:user_id], player_name, color})

    {:reply, :ok, socket}
  end

  @doc """
  Send initialize data to user
  """
  def handle_info({:after_join, online_num, games}, socket) do
    push socket, "initialize", %{
      "onlineNum" => online_num,
      "games" => games,
    }

    {:noreply, socket}
  end

  def terminate(_message, _socket) do
    PubSub.broadcast(:power_grid, "user:leave")
  end
end
