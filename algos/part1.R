# Load required libraries
library(igraph)
library(dplyr)
library(tidyr)
library(ggplot2)

# Read CSV files
# Assuming you have multiple CSV files named like "followers_YYYY-MM-DD.csv"
file_list <- list.files(pattern = "followers_.*\\.csv")

# Function to process each file and create a graph
process_file <- function(file) {
  data <- read.csv(file)
  graph <- graph_from_data_frame(data, directed = TRUE)
  
  # Extract date from filename
  date <- as.Date(sub("followers_(.*)\\.csv", "\\1", file))
  
  list(date = date, graph = graph)
}

# Process all files
graphs <- lapply(file_list, process_file)

# Analyze graphs over time
analyze_graphs <- function(graphs) {
  results <- data.frame()
  
  for (g in graphs) {
    date <- g$date
    graph <- g$graph
    
    # Calculate various metrics
    n_nodes <- vcount(graph)
    n_edges <- ecount(graph)
    density <- graph.density(graph)
    avg_degree <- mean(degree(graph))
    clustering_coef <- transitivity(graph)
    
    # Identify influential nodes
    page_rank <- page_rank(graph)$vector
    betweenness <- betweenness(graph)
    
    top_influential <- data.frame(
      node = names(sort(page_rank, decreasing = TRUE)[1:5]),
      page_rank = sort(page_rank, decreasing = TRUE)[1:5]
    )
    
    # Store results
    results <- rbind(results, data.frame(
      date = date,
      n_nodes = n_nodes,
      n_edges = n_edges,
      density = density,
      avg_degree = avg_degree,
      clustering_coef = clustering_coef,
      top_influential = list(top_influential)
    ))
  }
  
  results
}

# Run analysis
analysis_results <- analyze_graphs(graphs)

# Visualize changes over time
ggplot(analysis_results, aes(x = date)) +
  geom_line(aes(y = n_nodes, color = "Nodes")) +
  geom_line(aes(y = n_edges, color = "Edges")) +
  labs(title = "Network Growth Over Time", x = "Date", y = "Count") +
  scale_color_manual(values = c("Nodes" = "blue", "Edges" = "red")) +
  theme_minimal()

# Visualize network metrics
ggplot(analysis_results, aes(x = date)) +
  geom_line(aes(y = density, color = "Density")) +
  geom_line(aes(y = avg_degree, color = "Avg Degree")) +
  geom_line(aes(y = clustering_coef, color = "Clustering Coefficient")) +
  labs(title = "Network Metrics Over Time", x = "Date", y = "Value") +
  scale_color_manual(values = c("Density" = "green", "Avg Degree" = "orange", "Clustering Coefficient" = "purple")) +
  theme_minimal()

# Function to visualize the graph at a specific time point
visualize_graph <- function(graph, date) {
  plot(graph, 
       main = paste("Network Structure on", date),
       vertex.size = 3,
       vertex.label = NA,
       edge.arrow.size = 0.5)
}

# Visualize the most recent graph
latest_graph <- graphs[[length(graphs)]]
visualize_graph(latest_graph$graph, latest_graph$date)