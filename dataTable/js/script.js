
$(document).ready(function() {
    // $('#example tfoot th').each( function() {
    //     var title = $(this).text();
    //     $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    // });

    // Setup - add a text input to each footer cell
    // $('#example thead tr')
    //     .clone(true)
    //     .addClass('filters')
    //     .appendTo('#example thead');

    $('#example').DataTable( {
        // 'ajax': './data/datSet.js',
        columns: [
        
            { title: 'Province' },
            { title: 'District' },
            { title: 'Municipality' },
            { title: 'Component.' },
            { title: 'Indicator' },
            {
                title: 'Normalized Value',
                render: function(data, type, row) {
                    if (type === 'display') {
                        // Check if data is a number
                        if (!isNaN(parseFloat(data)) && isFinite(data)) {
                            // Round to two decimal places
                            const roundedValue = Number(data).toFixed(2);
                            // Display 0 instead of 0.00
                            return roundedValue === '0.00' ? '0' : roundedValue;
                        } else {
                            return data;
                        }
                    }
                    return data;
                }
            },
            { title: 'Raw(Actual) Data' },

           
        ],
        data: valuesOnly,
        pageLength: 15,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        // For Select
        columnDefs: [
            {
                orderable: false,
                // className: 'select-checkbox',
                targets: 0,
                checkboxes: {
                    selectRow: true
                }
            }
        ],
        select: {
            style: 'multi'
        },
        order: [[1, 'asc']],
        // orderCellsTop: true,
        // fixedHeader: true,
        initComplete: function () {
            var notApplyFilterOnColumn = [5,6];
			var inputFilterOnColumn = [4];
			var showFilterBox = 'afterHeading'; //beforeHeading, afterHeading
			$('.gtp-dt-filter-row').remove();
			var theadSecondRow = '<tr class="gtp-dt-filter-row">';
			$(this).find('thead tr th').each(function(index){
				theadSecondRow += '<td class="gtp-dt-select-filter-' + index + '"></td>';
			});
			theadSecondRow += '</tr>';

			if(showFilterBox === 'beforeHeading'){
				$(this).find('thead').prepend(theadSecondRow);
			}else if(showFilterBox === 'afterHeading'){
				$(theadSecondRow).insertAfter($(this).find('thead tr'));
			}
            this.api().columns().every( function (index) {
				var column = this;

				if(inputFilterOnColumn.indexOf(index) >= 0 && notApplyFilterOnColumn.indexOf(index) < 0){
					$('td.gtp-dt-select-filter-' + index).html('<input type="text" class="gtp-dt-input-filter">');
			        $( 'td input.gtp-dt-input-filter').on( 'keyup change clear', function () {
			            if ( column.search() !== this.value ) {
			                column
			                    .search( this.value )
			                    .draw();
			            }
			        } );
				}else if(notApplyFilterOnColumn.indexOf(index) < 0){
					var select = $('<select><option value="">Select</option></select>')
			            .on( 'change', function () {
			                var val = $.fn.dataTable.util.escapeRegex(
			                    $(this).val()
			                );
		
			                column
			                    .search( val ? '^'+val+'$' : '', true, false )
			                    .draw();
			            } );
			        $('td.gtp-dt-select-filter-' + index).html(select);
                    
			        column.data().unique().sort().each( function ( d, j ) {
			            select.append( '<option value="'+d+'">'+d+'</option>' );
			        } );
				}
			});
            $('select').on('change', function () {
                if ($(this).val() !== '') {
                    $(this).css('background-color', '#f5c775');
                } else {
                    $(this).css('background-color', ''); // Reset to default background color
                }
            });
            // // for search
            // var api = this.api();
            // // For each column
            // api
            //     .columns()
            //     .eq(0)
            //     .each(function (colIdx) {
            //         // Set the header cell to contain the input element
            //         var cell = $('.filters th').eq(
            //             $(api.column(colIdx).header()).index()
            //         );
            //         var title = $(cell).text();
            //         $(cell).html('<input type="text" placeholder="Search ' + title + '" />');
 
            //         // On every keypress in this input
            //         $(
            //             'input',
            //             $('.filters th').eq($(api.column(colIdx).header()).index())
            //         )
            //             .off('keyup change')
            //             .on('change', function (e) {
            //                 // Get the search value
            //                 $(this).attr('title', $(this).val());
            //                 var regexr = '({search})'; //$(this).parents('th').find('select').val();
 
            //                 var cursorPosition = this.selectionStart;
            //                 // Search the column for that value
            //                 api
            //                     .column(colIdx)
            //                     .search(
            //                         this.value != ''
            //                             ? regexr.replace('{search}', '(((' + this.value + ')))')
            //                             : '',
            //                         this.value != '',
            //                         this.value == ''
            //                     )
            //                     .draw();
            //             })
            //             .on('keyup', function (e) {
            //                 e.stopPropagation();
 
            //                 $(this).trigger('change');
            //                 $(this)
            //                     .focus()[0]
            //                     .setSelectionRange(cursorPosition, cursorPosition);
            //             });
            //     });
        },
    } );

} );