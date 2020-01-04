// Load shapefiles for the region and training data 
var southtrain = ee.FeatureCollection("users/ollielballinger/FullTraining")
var Punjab= ee.FeatureCollection("users/ollielballinger/Tehsil")

// Isolate the spectral wavelengths reflected most strongly by Sugarcane; 
// In my case, these are green (B3, B4), near-infrared (B5), and short-wave infrared (B7),
var bands = ['B3', 'B4','B5', 'B7'];

var label = 'class';

// Load the LANDSAT imagery
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1')

// filter imagery to months during which Sugarcane is at the peak of its growing season and other crops are not.
var image = ee.Algorithms.Landsat.simpleComposite({
  collection: l8.filterDate('2014-05-15', '2015-06-01'),
  asFloat: true
}).clip(Punjab);

// Now we collate the training data into one feature collection

var sample=ee.FeatureCollection([Water, Urban, Desert, Sugarcane, Cotton, Rice]).flatten();

// Combine training data coordinates with spectrally disaggregated satellite images 

var training = image.select(bands).sampleRegions({
  collection: sample,
  properties: [label],
  scale: 30
});

// Create a function to conduct accuracy testing using a confusion matrix and F1 score.

var test=function(classifier){
  var trainAccuracy = classifier.confusionMatrix();
  return [print('Resubstitution error matrix: ', trainAccuracy),
  print('Training overall accuracy: ', trainAccuracy.accuracy())];
}

// Apply different classification algorithms and compare results 

// CART

var cart1 = ee.Classifier.cart().train(training, label, bands);
var cart2 = image.select(bands).classify(cart1);

test(cart1)

// SVM

var svm1 = ee.Classifier.svm({
  kernelType: 'RBF',
  gamma: 0.5,
  cost: 10
});

var svm2 = svm1.train(training, 'class', bands);
var svm3 = image.classify(svm2);
test(svm2)

// Random Forest

var randomforest1 = ee.Classifier.randomForest(10)
    .train(training, 'class');
var randomforest2 = image.classify(randomforest1);
test(randomforest1)

// Naive Bayes

var bayes1 = ee.Classifier.naiveBayes()
    .train(training, 'class');
var bayes2 = image.classify(bayes1);
test(bayes1)


    



