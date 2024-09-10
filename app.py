from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import csv
from io import StringIO

app = Flask(__name__)
CORS(app)

sheet_id = '1guE4DI4wQpBXPlXRKXVEeb3nH84Phq6YqgYK9M4NUT0'
api_key = 'AIzaSyCMKK9eVpVOWdJZAZ8yyH4GZTrfhVLdUzg'

def get_public_sheet_data(g_id):
  url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&gid={g_id}"

  response = requests.get(url)

  if response.status_code != 200:
    return None
  
  csv_data = csv.reader(StringIO(response.text))
  grid = list(csv_data)

  return grid

def find_qualifying_cells(grid):
  m = len(grid)
  n = len(grid[0])
  nw = [[False for _ in range(n)] for _ in range(m)]
  se = [[False for __ in range(n)] for _ in range(m)]
  res = []

  dirs = [(0, 1), (0, -1), (1, 0), (-1, 0)]

  def get_neighbours(x, y):
    neighbours = []

    for dirx, diry in dirs:
      newx, newy = x + dirx, y + diry
      if 0 <= newx < m and 0 <= newy < n:
        neighbours.append((newx, newy))
    
    return neighbours

  def dfs(x, y, ocean):
    if ocean[x][y]: return
    ocean[x][y] = True

    for newx, newy in get_neighbours(x, y):
      if int(grid[newx][newy]) >= int(grid[x][y]):
        dfs(newx, newy, ocean)

  for x in range(m):
    dfs(x, 0, nw)
    dfs(x, n-1, se)

  for y in range(n):
    dfs(0, y, nw)
    dfs(m-1, y, se)

  for x in range(m):
    for y in range(n):
      if(nw[x][y] and se[x][y]):
        res.append([x, y])

  return res

#Flask API endpoints
@app.route('/qualifying-cells', methods=['GET'])
def get_qualifying_cells():
  g_id = request.args.get('gId')
  grid = get_public_sheet_data(g_id)

  if grid is None:
    return jsonify({"error": "Failed to retrieve data"}), 500

  qualifying_cells = find_qualifying_cells(grid)

  return jsonify({"qualifies": qualifying_cells})

@app.route('/get-tabs', methods=['GET'])
def get_tabs():
  url = f"https://sheets.googleapis.com/v4/spreadsheets/{sheet_id}?key={api_key}"
  response = requests.get(url)

  if response.status_code != 200:
    return jsonify({"error": "Failed to retrive tab names"}), 500

  data = response.json()
  sheets = data.get("sheets", [])

  tab_data = [(sheet["properties"]["title"], sheet["properties"]["sheetId"]) for sheet in sheets]
  return jsonify({"tabs": tab_data})

@app.route('/get-grid-data', methods=['GET'])
def get_grid_data():
  g_id = request.args.get("gId")
  grid = get_public_sheet_data(g_id)

  if grid is None:
    return jsonify({"error": "Failed to retrieve data"}), 500

  return jsonify({"grid": grid})

if __name__ == '__main__':
  app.run(debug=True)