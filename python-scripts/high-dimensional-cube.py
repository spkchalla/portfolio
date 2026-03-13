import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import os


side_length = 1

# Directory where images will be saved
OUTPUT_DIR = "../public/articles"
os.makedirs(OUTPUT_DIR, exist_ok=True)


# ----------------------------
# Volume Shrink Plot
# ----------------------------
def draw_volume_shrink():
    epsilon = 0.1
    dimensions = np.arange(1, 50)
    shrink_factor = (1 - epsilon) ** dimensions

    plt.figure(figsize=(4,4))
    plt.plot(dimensions, shrink_factor)

    plt.xlabel("Dimension (d)")
    plt.ylabel("(1 - ε)^d")
    plt.title("Volume Shrink in High Dimensions")


    plt.savefig(os.path.join(OUTPUT_DIR, "volume_shrink_high_dimensions.png"), dpi=600)
    plt.close()


# ----------------------------
# Run everything
# ----------------------------

draw_volume_shrink()

print(f"All images generated in {OUTPUT_DIR}")