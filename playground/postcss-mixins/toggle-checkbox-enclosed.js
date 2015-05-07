var corepostcss = require('postcss');

module.exports = function(mixins, checkboxSelector, labelOn, labelOff) {
	labelOn = labelOn || "'on'";
	labelOff = labelOff || "'off'";


	var extraSpacingWidth = 1;
	// Remove the quotes from overall length
	// But then we also add some padding width
	var labelOnWidth = (labelOn.length-2) + 2;
	var labelOffWidth = (labelOff.length-2) + 2;

	var totalCheckboxWidth = labelOnWidth + extraSpacingWidth + labelOff.length;

	// If you want to change this module to non-es6.
	// You could use this package with their string substitution feature: https://github.com/sindresorhus/multiline
	var checkboxEnclosedCss = `& {
		position: relative;
		
		display: inline-block;
		vertical-align: middle;
		
		width: ` + totalCheckboxWidth + `ch;
		height: 2rem;
		
		padding: 0.5ch 0.8ch;
	
		background: #666666;
		border-radius: 4px;
  		border: 2px solid #444;

		color: rgba(255, 255, 255, 0.4);

		cursor: pointer;
		cursor: hand;

		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-o-user-select: none;
		user-select: none;

		&:focus,
		` + checkboxSelector + `:focus ~ &,
		` + checkboxSelector + `:focus ~ * & {
			box-shadow: inset 0 0 4px 0 rgba(255, 255, 255, 0.5);
		}


		&:before {
			content: ` + labelOn + `;

			position: absolute;
			top: 50%;
			left: 10px;

			transform: translate(0, -50%);
		}

		&:after {
			content: ` + labelOff + `;

			position: absolute;
			top: 50%;
			right: 10px;

			transform: translate(0, -50%);
		}


		& > .switch {
			z-index: 2;

			position: relative;
			top: 0;
			left: 0;
			
			display: inline-block;
			/* use the opposite width to cover up the other label */
			width: ` + labelOnWidth + `ch;
			height: 100%;
			
			padding: 0;
			margin: 0;
			
			background: #cc8888;
			border: 2px solid rgba(0, 0, 0, 0.2);

			border-radius: 6px;

			outline: none;

			cursor: pointer;
			cursor: hand;
			
			/* Autoprexier doesn't have this yet :/ - https://github.com/postcss/autoprefixer/issues/43 */
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			
			transition: all 0.1s linear;


			&:focus {
				&:before {
					background: rgba(255, 80, 100, 0.9);
				}

			}

			` + checkboxSelector + `:checked ~ &,
			` + checkboxSelector + `:checked ~ * > & {
				/* use the opposite width to cover up the other label */
				width: ` + labelOffWidth + `ch;

				left: calc(100% - ` + labelOffWidth + `ch);

				background: #00ee00;
			}

			` + checkboxSelector + `:checked:focus ~ &,
			` + checkboxSelector + `:checked:focus ~ * & {
				&:before {
					background: rgba(100, 255, 100, 1);
				}

			}


			&:before {
				content: '';

				position: absolute;
				top: 50%;
				right: 0.8ch;

				width: ` + ((Math.min(labelOnWidth, labelOffWidth)/2) - 1) + `ch;
				height: 0.8ch;
	
				background: rgba(0, 0, 0, 0.25);
				border: 1px solid rgba(0, 0, 0, 0.2);

				border-radius: 0.3ch;


				transform: translate(0, -50%);

				transition: all 0.1s linear
			}

		}

	}`;


	var root = corepostcss.parse(checkboxEnclosedCss);

	mixins.replaceWith(root);
};