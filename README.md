# Machine-Learning-Crop-Identification
Here I show how to integrate information on crop cycles with a CART classification algorithm in Google Earth Engine to identify the annual extent of sugarcane in Pakistan over the course of 34 years. 

There are 5 broad steps to this process:

1) Generating training data. I identify sugarcane using crop masks provided by SUPARCO (the Pakistani Space Agency), and other types of landcover (urban, water, desert) visually. 

2) Selecting properly timed imagery. This was done by first filtering the imagery to 2015 (the year the crop masks were created), and to months in which sugarcane is in peak growth while other local crops (mostly rice and wheat) are not. 

3) Spectrally disaggregating LANDSAT data. This involves isolating wavelengths that sugarcane most strongly reflects: green (B3, B4), near-infrared (B5), and short-wave infrared (B7). 

4) Training the classifier. Using the processed 2015 data, a signature file is generated that distinguishes the spectral profiles of the landcover types provided.

5) Applying classification. I first do this with the 2015 data, but it can be applied longitudinally because the spectral profiles of the landcover types remain constant throughout time. 
