# Image-Target-Generator

A web-based tool designed to simplify the creation of high-quality image markers for Augmented and Mixed Reality applications. Customize size, aspect ratio, border, background, style, and colors to generate effective image targets effortlessly.

## Features
### Customization Options:

* Size and Aspect Ratio: Set custom dimensions and choose from common aspect ratios (1:1, 4:3, 16:9).
* Border and Background: Add optional borders and select background colors.
* Styles: Choose from different geometric patterns to suit your application's aesthetics.
* Colors: Customize up to three colors, including the ability to input hex codes or use color pickers.

### Marker Analysis:

* Automatically analyze the generated marker using the OpenCV ORB algorithm to get an estimate of the marker's quality and tracking performance.

### User-Friendly Interface:

* Responsive Design: Works seamlessly across different devices and screen sizes.
* Instant Preview: View the generated marker in real-time as you customize settings.
* Easy Download: Download the generated image target with a single click.

## Getting Started

### Installation & Usage

No installation is required. The AR Image Target Generator is a web-based tool that you can access through your web browser at https://saschalange.github.io/Image-Target-Generator/

### Configure Your Marker:

* Dimension: Choose whether to set the width or height of the marker and input the desired size in pixels.
* Aspect Ratio: Select an aspect ratio that fits your project's requirements.
* Border: Add an optional border in white or black, or select 'None' for no border.
* Background: Choose a background color for your marker.
* Style: Select a geometric pattern style (e.g., Mazzanti, Chaos, Dot Matrix).
* Colors: Customize up to three colors using the color pickers or by entering hex codes.

### Generate Marker:

Click the Generate Marker button to create a new image target based on your configurations.
The generated marker will be displayed in the results section.

### Analyze Marker:

The tool automatically analyzes the marker using the [OpenCV ORB](https://docs.opencv.org/4.x/d1/d89/tutorial_py_orb.html) algorithm.
The number of features detected is displayed in the results header, providing an estimate of the marker's quality and tracking performance.

### Download Marker:

Click the Download Image Target button to save the generated marker as a .png file to your device.

### Styles and Patterns

The AR Image Target Generator offers multiple geometric styles to suit different preferences:

* Mazzanti: A pattern inspired by Dario Mazzanti's original Processing sketch, featuring triangles and random ellipses for high feature distribution.
* Chaos: A highly textured, random pattern with various shapes to maximize feature points.
* Dot Matrix: A structured grid of dots resembling a dot matrix or barcode pattern.

## License
This project is licensed under the MIT License. You are free to use, modify, and distribute this software in compliance with the license terms.

## Acknowledgements
I would like to express my gratitude to Dario Mazzanti for sharing his insightful blog post and Processing sketch with the public. His work enabled me to conduct my AR research and significantly influenced the creation of this tool. In honor of his contribution, the "Mazzanti" style option in this generator is named after him, as its implementation incorporates elements of his original Processing sketch.

[Dario Mazzanti's Blog Post: AR Image Target Generation for Vuforia](https://www.dariomazzanti.com/uncategorized/ar-image-target-generation-vuforia/)


## Contact
For questions, suggestions, or collaboration opportunities, feel free to get in touch:

Author: [Sascha Lange](https://www.linkedin.com/in/contact-with-saschalange/)

Thank you for using the AR Image Target Generator! Your feedback and support are greatly appreciated.
