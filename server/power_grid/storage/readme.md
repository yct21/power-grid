# server/power_grid/storage

Here defines Ecto schemas for `Game` and `Player`.

I love the idea that player having different names in each game. So `Player` is simply a
embeded schema in `Game` instead of a seperate table, since no other player data
is needed to be persisted right now.
