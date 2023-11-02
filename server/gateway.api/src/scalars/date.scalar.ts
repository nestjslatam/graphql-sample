import { Scalar } from "@nestjs/graphql";
import { Kind, ASTNode } from "graphql";

@Scalar("Date")
export class DateScalar {
  description = "Date custom scalar type";

  parseValue(value: Date) {
    return new Date(value);
  }

  serialize(value: Date) {
    return value.getTime();
  }

  parseLiteral(ast: ASTNode) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  }
}
