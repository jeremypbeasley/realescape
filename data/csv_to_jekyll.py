# This script takes a file CSV file called 'data.csv' and outputs each row as a YAML file named after first column.
# Data in the first row of the CSV is assumed to be the column heading.
# This is an iteration on work done by others here https://github.com/hfionte/csv_to_yaml and https://github.com/EvanLovely/csv_to_jekyll/blob/master/csv_to_jekyll.py

# Import the python library for parsing CSV files.
import csv
import logging
import os

# Open our data file in read-mode.
csvfile = open('data.csv', 'r')

# Save a CSV Reader object.
datareader = csv.reader(csvfile, delimiter=',', quotechar='"')

# Empty array for data headings, which we will fill with the first row from our CSV.
data_headings = []

# Loop through each row...
for row_index, row in enumerate(datareader):

	# If this is the first row, populate our data_headings variable.
	if row_index == 0:
		data_headings = row

	# Otherwise, create a YAML file from the data in this row...
	else:
		# Open a new file with filename based on the first column
		filename = row[0].lower().replace(' ', '_') + '.markdown'
		path = '../_blog/'
		# new_yaml = open(filename, 'w')
		new_yaml = open(path + filename, 'w')

		# Empty string that we will fill with YAML formatted text based on data extracted from our CSV.
		yaml_text = ''
		yaml_text += '---\n'

		# Loop through each cell in this row...
		for cell_index, cell in enumerate(row):

			# Compile a line of YAML text from our headings list and the text of the current cell, followed by a linebreak.

			# Heading text is converted to lowercase. Spaces are converted to underscores and hyphens are removed.
			cell_heading = data_headings[cell_index].lower().replace(' ', '_').replace('-', '_').replace('%', 'percent').replace('$', '').replace(',', '')

			# only takes the columns with the labels you choose explicity
			if cell_heading in ['title', 'layout', 'date', 'author']:
				# In the cell text, line endings are replaced with commas, remove double quotes so YAML syntax doesn't break
				cell_text = cell_heading + ': ' + cell.replace('\n', ', ').replace('"', '') + '\n'
				# Add this line of text to the current YAML string.
				yaml_text += cell_text

			# take column titled 'content' and treats it separately so it's at the bottom of the markdown file and valid {{ content }} as per Jekyll's expectations
			if cell_heading == 'content':
				content = cell

		# Write our YAML string to the new text file and close it.
		new_yaml.write(yaml_text + '---\n\n' + content)
		new_yaml.close()
		# Log a confirmation in the console
		logging.warning('File: ' + filename + ' has been created.')

# We're done! Close the CSV file.
csvfile.close()
