defmodule PowerGrid.Repo.Migrations.CreateGames do
  use Ecto.Migration

  def change do
    create table(:games, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :actions, {:array, :map}

      timestamps()
    end

  end
end
