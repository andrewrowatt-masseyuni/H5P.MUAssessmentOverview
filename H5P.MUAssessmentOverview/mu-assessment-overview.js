var H5P = H5P || {};
 
H5P.MUAssessmentOverview = (function ($) {
  /**
   * Constructor function.
   */
  function C(options, id) {
    this.options = options;
    this.id = id;
  };
 
  /**
   * Attach function called by H5P framework to insert H5P content into
   * page
   *
   * @param {jQuery} $container
   */
  C.prototype.attach = function ($container) {
    // container.  Allows for styling later.
    $container.addClass("h5p-assessments");

	var html = '<table class="mu-table1-grey assessment-overview"><thead><tr><td>Assessment</td><td>Learning<br>Outcomes</td><td>Weight</td><td>Due Dates</td></tr></thead><tbody>';
	var i = 1;
	for(assessment of this.options.assessments) {
		html += `<tr><td class="assessment">${assessment.assessment}</td><td class="learningoutcomes">${assessment.learningoutcomes}</td><td class="weighting">${assessment.weighting}</td><td class="duedate">${assessment.duedate}</td></tr>`;
		i+=1;
	}
	
	html += '</tbody></table>';
	$container.append(html);
  };
 
  return C;
})(H5P.jQuery);