defmodule PowerGridWeb.MainMenuChannel do
  use PowerGridWeb, :channel
  @moduledoc """
  Channel for users in main menu.

  - refresh online number
  - refresh game list
  """

  def join("MainMenu", _params, socket) do
    {:ok, socket}
  end
end
