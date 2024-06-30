# Load necessary libraries
install.packages("networkD3")
install.packages("tidyverse")

library(networkD3)
library(tidyverse)

# Read the CSV file
followers_data <- read.csv("followers_data.csv")

# Calculate the differences in followers between consecutive time points
followers_diff <- followers_data %>%
  pivot_longer(cols = starts_with("t"), names_to = "time", values_to = "followers") %>%
  arrange(account, time) %>%
  group_by(account) %>%
  mutate(diff = followers - lag(followers)) %>%
  filter(!is.na(diff))

# Create nodes data frame
nodes <- followers_data %>%
  select(account) %>%
  rename(name = account)

# Create edges data frame
edges <- followers_diff %>%
  mutate(from = lag(account), to = account) %>%
  filter(!is.na(from)) %>%
  select(from, to, value = diff)

# Create an index for the nodes
nodes$index <- 0:(nrow(nodes) - 1)

# Replace node names with their indices in the edges data frame
edges <- edges %>%
  left_join(nodes, by = c("from" = "name")) %>%
  rename(from_index = index) %>%
  left_join(nodes, by = c("to" = "name")) %>%
  rename(to_index = index) %>%
  select(from_index, to_index, value)

# Create a network graph using networkD3
forceNetwork(Links = edges, Nodes = nodes, Source = "from_index", Target = "to_index", 
             NodeID = "name", Group = "index", Value = "value", 
             opacity = 0.8, zoom = TRUE, legend = TRUE)
