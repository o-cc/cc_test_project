
<script>
  
  export default {
    name: "arrow",
    props: {
    	direction: {
    		type: String,
    		
    	}
    },

    render: function  ( createElement ) {
    	let src = "./../../../static/imgs/";

		if( this.direction ==="left" ) {
			src = src + "箭头(left).png";

			return createElement(
				"img",{
					attrs: {
						src: src
					},
					style: {
						width: ".6rem",
					}
			})
		}

		 if( this.direction ==="right" ) {
			src = src + "箭头.png";
			return createElement(
				"img",{
					attrs: {
						src: src
					},
					style: {
						width: ".6rem",
					}
			})
		}



	
    
    },

    data() {
      return {
            
      };
    }

  };

</script>

<style scoped lang="scss">
  	.arrow {

  		p {
  			font-size: .5rem;
  			position: absolute;
  			top: 0;
  		}
  	}

</style>
