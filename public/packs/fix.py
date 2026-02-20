import sys

def fix_csv(input_path, output_path):
    with open(input_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    with open(output_path, "w", encoding="utf-8") as f:
        for i, line in enumerate(lines):
            line = line.rstrip("\n")

            # keep header as-is
            if i == 0:
                f.write(line + "\n")
                continue

            parts = line.split(",")

            # first 3 columns unchanged
            first_three = parts[:3]

            # rest = translation (can contain commas)
            translation = ",".join(parts[3:])

            # wrap with quotes
            translation = f'"{translation}"'

            new_line = ",".join(first_three + [translation])
            f.write(new_line + "\n")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python fix_csv.py input.csv output.csv")
        sys.exit(1)

    fix_csv(sys.argv[1], sys.argv[2])