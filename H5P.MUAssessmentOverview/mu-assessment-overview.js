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

	var html = '<table><thead><tr><th>Assessment</th><th>Learning<br>Outcomes</th><th>Weight</th><th>Due Dates</th></tr></thead><tbody>';
	var i = 1;
	for(assessment of this.options.assessments) {
		html += `<tr><td class="assessment" data-label="Assessment"><div>${assessment.assessment}</div></td><td class="learningoutcomes" data-label="Learning Outcomes"><div>${assessment.learningoutcomes}</div></td><td class="weighting" data-label="Weight"><div>${assessment.weighting}</div></td><td class="duedate" data-label="Due Dates"><div>${assessment.duedate}</div></td></tr>`;
		i+=1;
	}
	
	html += '</tbody></table>';
	$container.append(html);
  };
 
  return C;
})(H5P.jQuery);