# Load necessary libraries
install.packages("igraph")
install.packages("ggraph")
install.packages("tidyverse")

library(igraph)
library(ggraph)
library(tidyverse)

# Read the CSV file
followers_data <- read.csv("followers_data.csv")

# Calculate the differences in followers between consecutive time points
followers_diff <- followers_data %>%
  gather(key = "time", value = "followers", -account) %>%
  arrange(account, time) %>%
  group_by(account) %>%
  mutate(diff = followers - lag(followers)) %>%
  filter(!is.na(diff))

# Create edges data frame
edges <- followers_diff %>%
  group_by(account) %>%
  summarise(
    from = lag(account),
    to = account,
    weight = sum(diff, na.rm = TRUE)
  ) %>%
  filter(!is.na(from))

# Create nodes data frame
nodes <- followers_data %>%
  select(account) %>%
  rename(id = account)

# Create an igraph object
net <- graph_from_data_frame(d = edges, vertices = nodes, directed = TRUE)

# Plot the network graph
ggraph(net, layout = "fr") +
  geom_edge_link(aes(width = weight), arrow = arrow(length = unit(4, 'mm')), end_cap = circle(3, 'mm')) +
  geom_node_point(size = 5) +
  geom_node_text(aes(label = id), vjust = 1.5, hjust = 1.5) +
  theme_void() +
  ggtitle("Network Graph of Facebook Followers Spread Over Time")
