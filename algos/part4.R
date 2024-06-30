install.packages("igraph")
install.packages("dplyr")
library(igraph)
library(dplyr)

# Read the CSV file
data <- read.csv("twitter_followers.csv")

# Create an initial graph using the first time point
initial_data <- data %>% filter(time == min(time))
edges <- as.matrix(initial_data[, c("user", "follows")])
g <- graph_from_edgelist(edges, directed = TRUE)

# Function to update the graph
update_graph <- function(g, new_data) {
  edges <- as.matrix(new_data[, c("user", "follows")])
  new_g <- add_edges(g, t(edges))
  return(new_g)
}

# Loop over each time point to update the graph
unique_times <- unique(data$time)
for (t in unique_times[-1]) {
  new_data <- data %>% filter(time == t)
  g <- update_graph(g, new_data)
}

# Analyze the graph
degree_distribution <- degree_distribution(g)
plot(degree_distribution, main="Degree Distribution", xlab="Degree", ylab="Frequency")

degree_centrality <- degree(g)
betweenness_centrality <- betweenness(g)
closeness_centrality <- closeness(g)

print(degree_centrality)
print(betweenness_centrality)
print(closeness_centrality)

communities <- cluster_edge_betweenness(g)
plot(communities, g, main="Community Detection")

plot(g, vertex.size=5, vertex.label=NA, main="Twitter Social Graph")
