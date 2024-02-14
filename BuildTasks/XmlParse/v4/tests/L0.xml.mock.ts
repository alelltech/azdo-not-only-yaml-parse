import { readFileSync } from 'node:fs';
import { join as joinPath } from 'node:path';

export const mockXmlContent = (() => {
  try {
    return readFileSync(joinPath(__dirname, 'mocks', 'L0.sourceContent.xml')).toString('utf-8');
  } catch (error) {
    console.error(error);
  }
}
)()

export const mockXmlQueries = [

  `var HAS_SPRING_BOOT_STARTER_WEB = .project.dependencies.dependency[?(@.artifactId._text=="spring-boot-starter-web")].artifactId._text`,
  `var HAS_SPRING_BOOT_CONFIGURATION_PROCESSOR = .project.dependencies.dependency[?(@.artifactId._text=="spring-boot-configuration-processor")].artifactId._text`,
  `var HAS_LOMBOK = .project.dependencies.dependency[?(@.artifactId._text=="lombok")].artifactId._text`,
  `var HAS_JUNIT_JUPITER = .project.dependencies.dependency[?(@.artifactId._text=="junit-jupiter")].artifactId._text`,
  `var HAS_SPRING_BOOT_STARTER_TEST = .project.dependencies.dependency[?(@.artifactId._text=="spring-boot-starter-test")].artifactId._text`,

  // its must output log warnings
  `var HAS_CUSTOM_LIB = .project.dependencies.dependency[?(@.artifactId._text=="custom-lib")].artifactId._text`,

  `var COMPONENT_VERSION = .project.version._text`,

  `echo  .project.artifactId._text`,
  `file  ./foo/bar.json  = .project.dependencies..artifactId._text`,

].join('\n')
