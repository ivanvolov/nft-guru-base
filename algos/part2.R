# Load the igraph package
library(igraph)

# Read the graph from a CSV file
# Replace 'path_to_your_file.csv' with the actual file path
edge_list <- read.csv('path_to_your_file.csv')

# Create a graph from the edge list
g <- graph_from_data_frame(edge_list, directed = FALSE)

# Plot the graph
plot(g, vertex.label = V(g)$name, main = "Facebook Friends and Followers Graph")

# Calculate degree centrality
degree_centrality <- degree(g)
print("Degree Centrality:")
print(degree_centrality)

# Calculate betweenness centrality
betweenness_centrality <- betweenness(g)
print("Betweenness Centrality:")
print(betweenness_centrality)

# Calculate closeness centrality
closeness_centrality <- closeness(g)
print("Closeness Centrality:")
print(closeness_centrality)

# Detect communities using the Louvain method
communities <- cluster_louvain(g)
print("Communities detected:")
print(communities)

# Plot the graph with community detection
plot(communities, g, main = "Communities in the Facebook Graph")

# Summary of the network
network_summary <- summary(g)
print("Network Summary:")
print(network_summary)

# Adjacency matrix of the graph
adj_matrix <- as_adjacency_matrix(g)
print("Adjacency Matrix:")
print(adj_matrix)

# Save results to files
write.csv(degree_centrality, file = "degree_centrality.csv")
write.csv(betweenness_centrality, file = "betweenness_centrality.csv")
write.csv(closeness_centrality, file = "closeness_centrality.csv")
write.csv(as.data.frame(adj_matrix), file = "adjacency_matrix.csv")

# Print the modularity of the detected communities
modularity_score <- modularity(communities)
print("Modularity Score:")
print(modularity_score)
