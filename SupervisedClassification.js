// This is a way basic framework for using machine learning to classify satellite imagery in Google Earth Engine. 
// I'm doing so using the example of sugarcane in Punjab, Pakistan.

// First, i create a rough outline of the study area (shapefiles are better, but this is enough for a demonstration)

var Punjab= ee.Geometry.Polygon(
        [[[71.78198536646084, 27.66590471592909],
          [75.51733692896084, 32.32602708315643],
          [71.57324513208584, 33.69864713505972],
          [69.05737599146084, 28.61527897711363]]]);


// Here i'm creating training data; this was done through visual identification of certain landcover types (desert, water, urban).
// For sugarcane, i overlaid shapefiles provided by the Pakistani government of known sugarcane cultivation.
// Each training data point is given a "class" property such that 1= sugarcane, 2= desert, 3= urban, 4=water.

var Urban = ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([73.07397532713105, 31.416612946868906]),
            {
              "class": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([73.07792353880097, 31.416466450987897]),
            {
              "class": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([73.0763785864084, 31.417858152620273]),
            {
              "class": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([73.05972743284394, 31.42466986797947]),
            {
              "class": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([73.06238818418672, 31.42496283388694]),
            {
              "class": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([73.05114436399629, 31.426134688364023]),
            {
              "class": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([73.05612254392793, 31.416905937944563]),
            {
              "class": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([73.05680918943574, 31.418663865180402]),
            {
              "class": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([73.1023852850168, 31.431407852278017]),
            {
              "class": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([73.10667681944062, 31.43192050517339]),
            {
              "class": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([73.11525988828828, 31.431407852278017]),
            {
              "class": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([73.1151740575998, 31.429210736688713]),
            {
              "class": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([73.11165499937226, 31.432579626205314]),
            {
              "class": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([73.11903643858125, 31.436534255076555]),
            {
              "class": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([73.12864947569062, 31.421227450008484]),
            {
              "class": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([73.12676120054414, 31.42269232416426]),
            {
              "class": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([73.12839198362519, 31.425182557716894]),
            {
              "class": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([73.10118365537812, 31.437779196302664]),
            {
              "class": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([73.10410189878633, 31.43463019533503]),
            {
              "class": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([73.10830760252168, 31.435728696060046]),
            {
              "class": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([73.11843562376191, 31.43448372759905]),
            {
              "class": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([73.12143969785859, 31.433238742603063]),
            {
              "class": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([73.09886622678926, 31.411558706769107]),
            {
              "class": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([73.09629130613496, 31.410899437985865]),
            {
              "class": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([73.12890696775605, 31.41522122676219]),
            {
              "class": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([73.13105273496797, 31.415294475703604]),
            {
              "class": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([73.13070941221406, 31.417198928105087]),
            {
              "class": 3,
              "system:index": "26"
            })]),
    Desert = /* color: #0000ff */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([69.40539397377279, 28.575845728932382]),
            {
              "class": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([69.45620574135091, 28.578257707597015]),
            {
              "class": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([69.51766051430013, 28.577654718115905]),
            {
              "class": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([69.58426512855794, 28.577051725178066]),
            {
              "class": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([69.47577513832357, 28.59905872752671]),
            {
              "class": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([69.43120290266006, 28.5797127208684]),
            {
              "class": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([69.52081014142959, 28.567350916624214]),
            {
              "class": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([69.69109822736709, 29.814150510497807]),
            {
              "class": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([69.78448201642959, 29.680610632575185]),
            {
              "class": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([69.85589314924209, 29.671065267137205]),
            {
              "class": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([69.90533162580459, 29.671065267137205]),
            {
              "class": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([70.10308553205459, 29.685382975458865]),
            {
              "class": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([70.22393514142959, 30.01888263940922]),
            {
              "class": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([70.24041463361709, 30.19470992364425]),
            {
              "class": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([70.54253865705459, 30.28013426599556]),
            {
              "class": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([70.30633260236709, 29.89990355000398]),
            {
              "class": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([70.27886678205459, 29.77601441333992]),
            {
              "class": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([70.02068807111709, 29.312461569337678]),
            {
              "class": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([69.94927693830459, 28.90932455760557]),
            {
              "class": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([69.82842732892959, 28.923749469092677]),
            {
              "class": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([69.97124959455459, 29.178258149378518]),
            {
              "class": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([72.01195737866453, 31.809617496839653]),
            {
              "class": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([71.97899839428953, 31.702188516270397]),
            {
              "class": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([71.95702573803953, 31.613348877050345]),
            {
              "class": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([71.95702573803953, 31.529106719371445]),
            {
              "class": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([71.95702573803953, 31.48227264898117]),
            {
              "class": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([71.95702573803953, 31.43541512354706]),
            {
              "class": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([71.95702573803953, 31.379155159982407]),
            {
              "class": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([71.95702573803953, 31.332246102576587]),
            {
              "class": 2,
              "system:index": "28"
            })]),
    Sugarcane = /* color: #999900 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([70.87869652449331, 30.24305648297761]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([70.88015564619741, 30.24305648297761]),
            {
              "class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([70.88084229170522, 30.241833019573846]),
            {
              "class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([70.87389000593862, 30.23990510693743]),
            {
              "class": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([70.88260182081899, 30.240869067982885]),
            {
              "class": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([70.88946827589712, 30.241091519189183]),
            {
              "class": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([70.88946827589712, 30.23979388005457]),
            {
              "class": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([70.88470467268667, 30.235975014064227]),
            {
              "class": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([70.8809281223937, 30.235381778849227]),
            {
              "class": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([70.87183006941518, 30.23641993812607]),
            {
              "class": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([71.9635955437052, 30.331159616845554]),
            {
              "class": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([71.97011867602941, 30.331604109476245]),
            {
              "class": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([71.96874538501379, 30.33560445235965]),
            {
              "class": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([71.96445385058996, 30.32938162614734]),
            {
              "class": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([71.98282161792395, 30.339308327823137]),
            {
              "class": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([71.98196331103918, 30.330418791310933]),
            {
              "class": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([71.0908371088035, 29.221962193124007]),
            {
              "class": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([71.092943919616, 29.22963492958315]),
            {
              "class": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([71.09654880853202, 29.22963492958315]),
            {
              "class": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([71.08581997247245, 29.22701333180504]),
            {
              "class": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([70.23241710794025, 28.582630165499317]),
            {
              "class": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([70.23130130899006, 28.579012327164467]),
            {
              "class": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([70.23507785928302, 28.581348861988833]),
            {
              "class": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([70.21842670571857, 28.564615112733755]),
            {
              "class": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([70.22151661050373, 28.564615112733755]),
            {
              "class": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([70.24314594399982, 28.557679625865084]),
            {
              "class": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([70.24657917153888, 28.559036604905785]),
            {
              "class": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([70.24743747842365, 28.556548796635994]),
            {
              "class": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([70.24306011331134, 28.583911453398755]),
            {
              "class": 1,
              "system:index": "28"
            })]),
    Water = /* color: #009999 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([70.10204368666712, 28.7153749952767]),
            {
              "class": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([70.10770851210657, 28.72079465453966]),
            {
              "class": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([70.11388832167688, 28.72064411224182]),
            {
              "class": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([70.15817695693079, 28.738858156537873]),
            {
              "class": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([70.15457206801477, 28.733740481252116]),
            {
              "class": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([70.1643567665011, 28.74457761464784]),
            {
              "class": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([70.71049777957194, 29.30024660338376]),
            {
              "class": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([70.69573490115397, 29.290964766009807]),
            {
              "class": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([70.69058505984538, 29.28287989774369]),
            {
              "class": 4,
              "system:index": "8"
            })]);

// A note on training data: 
// I've used polygons and ee.randomPoints to create several thousand training data points, but doing so tends to max out the alloted user memory one is afforded on the Google servers that perfrom the computations. 
// Classification becomes extremely slow when the total number of points exceeds 200, and fails after roughly 300. 
// Generally, increasing the number of within-class observations improves classification far less increasing the number of across-class observations.

// Now we collate the training data into one feature collection

var sample=ee.FeatureCollection([Water, Urban, Desert, Sugarcane]).flatten();

// Load the LANDSAT imagery
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1')

// filter imagery to months during which Sugarcane is at the peak of its growing season and other crops are not.
var image = ee.Algorithms.Landsat.simpleComposite({
  collection: l8.filterDate('2014-05-15', '2015-06-01'),
  asFloat: true
}).clip(Punjab);

// Isolate the spectral wavelengths reflected most strongly by Sugarcane; 
// In my case, these are green (B3, B4), near-infrared (B5), and short-wave infrared (B7),
var bands = ['B3', 'B4', 'B5', 'B7'];

var label = 'class';

// Combine training data coordinates with spectrally disaggregated satellite images 
var training = image.select(bands).sampleRegions({
  collection: sample,
  properties: [label],
  scale: 30
});

// Train a CART classifier using default parameters
var trained = ee.Classifier.cart().train(training, label, bands);

// Apply classification to 2015 image
var classified = image.select(bands).classify(trained);

// Isolate sugarcane
var sugarcane= classified.gt(1)

// Visualize spectrally disaggregated data and classification.
var Vis = {
  min: 0.0,
  max: 4.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
}

Map.addLayer(image, 
              {bands: ['B4', 'B5', 'B7'], max: 0.4}, 
              'image');
Map.addLayer(classified,
             Vis,
             'classification');
    
// Compute zonal statistics 
var zonalstats = function(collection,regions, level, filename){
    
    // calculate statistics for each region.
    var mean = ee.Image(collection).reduceRegions({collection: regions, reducer: ee.Reducer.mean()});
    var median = ee.Image(collection).reduceRegions({collection: regions, reducer: ee.Reducer.median()});
    var stddev = ee.Image(collection).reduceRegions({collection: regions, reducer: ee.Reducer.stdDev()});
    var sum = ee.Image(collection).reduceRegions({collection: regions, reducer: ee.Reducer.sum()});
    
    var mean1 = mean.select(['.*'],null,false);
    var median1 = median.select(['.*'],null,false);
    var stddev1 = stddev.select(['.*'],null,false);
    var sum1 = sum.select(['.*'],null,false);
    
    // export results.

    var file=filename
    var levels=level
  return [
    Export.table.toDrive({
    collection: mean1, 
    description: level+"_Mean_"+file, 
    fileNamePrefix: level+"_Mean_"+file,
    fileFormat: 'CSV'
    }),
    Export.table.toDrive({
    collection: median1, 
    description: level+"_Median_"+file, 
    fileNamePrefix: level+"_Median_"+file,
    fileFormat: 'CSV'
    }),
    Export.table.toDrive({
    collection: stddev1, 
    description: level+"_StdDev_"+file, 
    fileNamePrefix: level+"_StdDev_"+file,
    fileFormat: 'CSV'
    }),
    Export.table.toDrive({
    collection: sum1, 
    description: level+"_Sum_"+file, 
    fileNamePrefix: level+"_Sum_"+file,
    fileFormat: 'CSV'
    })
  ]
}

// execute function and export CSVs to google drive 
zonalstats(sugarcane, Punjab, "Punjab", "Sugarcane Landcover")


// now, having trained the CART classifier to identify the unique spectral profile of sugarcane using 2015 data, we can use the signature file to classify sugarcane over time

var classified = image.select(bands).classify(trained);




