import React from "react"
import { css } from "@emotion/core"
import { Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
	return (
		<Layout>
			<SEO
				title={data.site.siteMetadata.title}
				description={data.site.siteMetadata.description}
			/>
			<div>
				<h1
					css={css`
						display: inline-block;
						border-bottom: 1px solid;
					`}
				>
					Amazing Pandas Eating Things
				</h1>
				<h4>{data.allMarkdownRemark.totalCount} Posts</h4>
				{data.allMarkdownRemark.edges.map(({ node }) => (
					<div key={node.id}>
						<Link
							to={node.fields.slug}
							css={css`
								text-decoration: none;
								color: inherit;
							`}
						>
							<h3
								css={css`
									margin-bottom: ${rhythm(1 / 4)};
								`}
							>
								{node.frontmatter.title}{" "}
								<span
									css={css`
										color: #555;
									`}
								>
									— {node.frontmatter.date}
								</span>
							</h3>
							<p>{node.excerpt}</p>
						</Link>
					</div>
				))}
			</div>
		</Layout>
	)
}

export const query = graphql`
	query {
		site {
			siteMetadata {
				description
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			totalCount
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "DD MMMM, YYYY")
					}
					fields {
						slug
					}
					excerpt
				}
			}
		}
	}
`
