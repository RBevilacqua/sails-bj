/**
 * ClothingController
 *
 * @description :: Server-side logic for managing Clothings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var async = require('async');
module.exports = {

	index: function (req, res) {
      res.view({result: null});
  },

	search: function(req, res, next) {
		var search = req.param('name');

		var element = search.split(" ");
		var arrayObj = new Array();

		for (var index=0; index < element.length; index++){
			arrayObj[index] = {
					name: element[index],
					attr: ''
			};
		}


		async.parallel({
				one: function(callback){
					async.waterfall([
							function wear (callback){
								Clothing.find(function clothingTypes(err, clothing){
									if (err) return err;
									return callback(null, clothing);
								});
							},
							function searching (clothing, callback){
								clothing.forEach(function (element){
									for (var index in arrayObj){
										if (element.name.match(new RegExp(arrayObj[index].name,'i'))){
											arrayObj[index].attr = 'Italic';
										}
									}
								});
								return callback(null, arrayObj);
                                console.log("ahora soy robe");
							}
					], function (err, one) {
							return callback(err,one);
					});
				},
				two: function(callback){
					async.waterfall([
							function kind (callback){
								Brand.find(function brandTypes(err, brand){
									if (err) return err;
									return callback(null, brand);
								});
							},
							function searching (brand, callback){
								brand.forEach(function (element){
									for (var index in arrayObj){
										if (element.name.match(new RegExp(arrayObj[index].name,'i'))){
											arrayObj[index].attr = 'Bold';
										}
									}
								});
								return callback(null,arrayObj);
							}
					], function (err, two) {
							return callback(err,two);

					});
				}
		},
		function(err, result) {
				res.view('clothing/index',{
				status: 'success',
				result: result.one
			});
		});

		/*async.waterfall([

			function wear (callback){
				Clothing.find(function clothingTypes(err, clothing){
					if (err) return err;
					return callback(null, clothing);
				});
			},

			function searching (clothing, callback){
				clothing.forEach(function (element){
					for (var index in arrayObj){
						if (element.name.match(new RegExp(arrayObj[index].name,'i'))){
							arrayObj[index].attr = 'Italic';
						}
					}
				});
				return callback(null);
			},

			function kind (callback){
				Brand.find(function brandTypes(err, brand){
					if (err) return err;
					return callback(null, brand);
				});
			},

			function searching (brand, callback){
				brand.forEach(function (element){
					for (var index in arrayObj){
						if (element.name.match(new RegExp(arrayObj[index].name,'i'))){
							arrayObj[index].attr = 'Bold';
						}
					}
				});
				return callback(null, arrayObj);
			},
		], function (err, result) {
			res.view('clothing/index',{
				status: 'success',
				result: result
			});
		});*/
	}
};

