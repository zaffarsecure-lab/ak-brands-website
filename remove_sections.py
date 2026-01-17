#!/usr/bin/env python3
"""
Script to remove Products and Features sections from index.html
Removes lines 2127-2379 (Products and Features sections)
"""

# Read the file
with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Keep lines 1-2126 and 2380-end
new_lines = lines[:2126] + lines[2379:]

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"✅ Successfully removed Products and Features sections!")
print(f"Original file: {len(lines)} lines")
print(f"New file: {len(new_lines)} lines")
print(f"Removed: {len(lines) - len(new_lines)} lines")
